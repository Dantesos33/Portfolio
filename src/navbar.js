import { BiHome } from "react-icons/bi"
import { GiSkills } from "react-icons/gi"
import { GrProjects } from "react-icons/gr"
import { LuContact } from "react-icons/lu"

const navbar = [
    {
        name: "Home",
        path: "home",
        icon: <BiHome/>
    },
    {
        name: "Skills",
        path: "skills",
        icon: <GiSkills/>
    },
    {
        name: "Projects",
        path: "projects",
        icon: <GrProjects/>
    },
    {
        name: "Contact",
        path: "contact",
        icon: <LuContact/>
    }
]

export default navbar