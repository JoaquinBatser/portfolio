import { RichButton } from "./components/rich-button"
import { WordsStagger } from "./components/words-stagger"
import IconPaperPlane from "./components/icon-paper-plane"
import { BlurReveal } from "./components/blur-reveal"
import { BlurRevealElement } from "./components/blur-reveal-element"
import IconDuplicatePlus from "./components/icon-copy"
import ShimmerText from "./components/shimmer-text"
import projects from "./data/projects.json"
import IconUruguay from "./components/icon-flag"
import IconWindowExpandBottomRightFill18 from "./components/icon-link"
import { Item, ItemActions, ItemContent, ItemDescription, ItemGroup, ItemTitle } from "./components/ui/item"

type Project = {
  name: string
  year: number
  description: string
  stack: string[]
  links: {
    live?: string
    github?: string
  }
}

export function App() {
  const projectList = projects as Project[]

  return (
    <div className="text-base grid min-h-svh min-w-screen grid-cols-2">
      <div className="flex h-full w-full items-center justify-center p-8  font-medium">
        <div className="text-muted-foreground max-w-md grid">
          <BlurRevealElement className="font-medium mb-4 flex items-center gap-2 leading-none justify-between "><div className="flex gap-2"> <span className="font-bold text-foreground">Joaquin</span>  <ShimmerText variant="green"> available for work </ShimmerText></div>
          </BlurRevealElement>
          <div className="grid gap-1 ">

            <BlurReveal speedReveal={2}>
              I&apos;m a 21 y/o{" "}
              <span className="font-bold text-foreground">engineer</span>
              {" "}with data science and AI background. Currently studying at UCU.


              Currently working in a {" "}<span className="font-bold text-foreground">full suite</span>{" "} for Padel Clubs and players in Uruguay.
            </BlurReveal>


          </div>

          <div className="flex gap-4">
            <BlurRevealElement as="div" className="mt-4 inline-flex">
              <RichButton color="default" size="sm">
                <IconPaperPlane size="24px" />
                Contact me
              </RichButton>
            </BlurRevealElement>
            <BlurRevealElement as="div" className="mt-4 inline-flex">
              <RichButton className="" color="default" size="sm">
                <IconDuplicatePlus size="24px" />
                My email
              </RichButton>
            </BlurRevealElement>
          </div>


        </div>
      </div>
      <div className="p-8  grid place-items-center ">
        <ItemGroup >
          {projectList.map((project) => (
            <Item key={project.name} role="listitem">
              <ItemContent>
                <a href=""><ItemTitle className="text-base">{project.name} <IconWindowExpandBottomRightFill18 size="16" /></ItemTitle></a>
                <ItemDescription>
                  {
                    project.description
                  }
                </ItemDescription>
              </ItemContent>
              <ItemContent>
                <ItemDescription>
                  {project.year}
                </ItemDescription>
              </ItemContent>
            </Item>
            // <article key={project.name} className="grid gap-1">
            //   <div className="flex items-center gap-2">
            //     <p className="font-semibold">{project.name}</p>
            //     <span className="text-muted-foreground text-sm">{project.year}</span>
            //   </div>
            //   <p className="text-muted-foreground">{project.description}</p>
            //   <p className="text-sm">{project.stack.join(" · ")}</p>
            //   <div className="flex gap-3 text-sm">
            //     {project.links.live ? <a href={project.links.live}>Live</a> : null}
            //     {project.links.github ? <a href={project.links.github}>GitHub</a> : null}
            //   </div>
            //   <IconWindowExpandBottomRightFill18 />
            // </article>
          ))}
        </ItemGroup>
      </div>
    </div>
  )
}

export default App
