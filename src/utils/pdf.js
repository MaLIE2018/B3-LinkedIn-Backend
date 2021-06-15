import  PdfPrinter from "pdfmake"
import  {fileURLToPath} from "url"
import {join,extname} from "path"
import fs from "fs"
import DataURIParser from "datauri/parser.js"
import { pipeline } from "stream";
import { promisify } from "util"
import util from "util"
import fetch from "node-fetch"
const asyncPipeline = promisify(pipeline)
const fontPath = join(fileURLToPath(import.meta.url), "../fonts")
export const tempFilePath = join(fileURLToPath(import.meta.url),"../temp/cv.pdf")

const getDataURI = async (url) => {
    try {
      const parser = new DataURIParser();
      const res = await fetch(url)
      const data = await res.buffer()
      const extension = extname(url)
      const dataURI = parser.format(extension,data).content
      return dataURI
    } catch (error) {
      console.log(error)
    }
}


const getExperiences = (experience) =>{
     const body = experience.reduce((acc,item) => {
      let header = { text: item.company + '-' + item.area, style: 'normal' }
      let list = {
        ul: [
          item.startDate + ' ' + item.endDate,
          item.role,
          item.description,
        ]
      }
      acc.push(header)
      acc.push(list)
      return acc},[])
     return body
}

export const createPDF = async (profile, experience) => {
  
  const fonts = {
    Roboto: {
      normal: join(fontPath,'Roboto-Regular.ttf'),
      bold: join(fontPath, 'Roboto-Medium.ttf'),
      italics: join(fontPath, 'Roboto-Italic.ttf'),
      bolditalics: join(fontPath,'Roboto-MediumItalic.ttf')
    }
  };
  
  const dataURI = await getDataURI(profile.image)
  const printer = new PdfPrinter(fonts);
  
  const docDefinition = {
    content: [
      {image: dataURI,
        width: 500},
        {
          text: profile.name + " " + profile.surname,
          style: 'header'
        },
        {
          text: profile.title,
          style: 'subheader'
        },
        {
          text: "Biography",
          style: 'subheader'
        },
        {
          text: profile.bio,
          style: 'normal'
        },
        {
          text: "Experience",
          style: 'subheader'
        },
        getExperiences(experience)
        
    ],
    styles: {
      header: {
        fontSize: 18,
        bold: true,
        margin: [10, 30, 40, 30]
      },
      subheader: {
        fontSize: 15,
        bold: false,
        margin: [10, 0, 0, 0]
      },
      normal: {
        fontSize: 12,
        bold: false,
        margin: [10, 20, 40, 0]
      },
      quote: {
        italics: true
      },
      small: {
        fontSize: 8
      }
    }
  };
  
  const readableStream = printer.createPdfKitDocument(docDefinition);
  const tempFolderPath = join(fileURLToPath(import.meta.url), "../temp/cv.pdf")
  readableStream.end();
  await asyncPipeline(
    readableStream, 
    fs.createWriteStream(tempFolderPath),
    )
}




