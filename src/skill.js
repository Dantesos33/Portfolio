import { FaHtml5 } from 'react-icons/fa' 
import { DiCss3 } from 'react-icons/di'
import { DiJavascript } from 'react-icons/di'
import { DiReact } from 'react-icons/di'
import { DiJqueryLogo } from 'react-icons/di'
import { DiPython } from 'react-icons/di'
import { DiPhotoshop } from 'react-icons/di'
import { FaFigma } from 'react-icons/fa'
import { DiGit } from 'react-icons/di'
import { DiIllustrator } from 'react-icons/di'
import { SiCanva, SiCsharp } from 'react-icons/si'

const skills = [
    {
        name: "Html",
        logo: <FaHtml5/>,
        progress: "90%"
    },
    {
        name: "Css",
        logo: <DiCss3/>,
        progress: "80%"
    },
    {
        name: "JavaScript",
        logo: <DiJavascript/>,
        progress: "70%"
    },
    {
        name: "JQuery",
        logo: <DiJqueryLogo/>,
        progress: "50%"
    },
    {
        name: "React Js",
        logo: <DiReact/>,
        progress: "45%"
    },
    {
        name: "Python",
        logo: <DiPython/>,
        progress: "55%"
    },
    {
        name: "Git",
        logo: <DiGit/>,
        progress: "65%"
    },
    {
        name: "C#",
        logo: <SiCsharp/>,
        progress: "78%"
    },
    {
        name: "Photoshop",
        logo: <DiPhotoshop/>,
        progress: "70%"
    },
    {
        name: "Illustrator",
        logo: <DiIllustrator/>,
        progress: "40%"
    },
    {
        name: "Figma",
        logo: <FaFigma/>,
        progress: "60%"
    },
    {
        name: "Canva",
        logo: <SiCanva/>,
        progress: "75%"
    }
]

export default skills