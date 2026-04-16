import { RichButton } from "./components/rich-button"
import IconPaperPlane from "./components/icon-paper-plane"
import { BlurReveal } from "./components/blur-reveal"
import { BlurRevealElement } from "./components/blur-reveal-element"
import ShimmerText from "./components/shimmer-text"
import projects from "./data/projects.json"
import IconWindowExpandBottomRightFill18 from "./components/icon-link"
import { Item, ItemContent, ItemDescription, ItemGroup, ItemTitle } from "./components/ui/item"
import { CopyButton } from "./components/copy-button"

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
  const projectList = [...(projects as Project[])].sort((a, b) => b.year - a.year)
  const projectRevealStep = 0.08

  return (
    <div className="text-base grid min-h-svh  md:grid-cols-2">
      <div className="flex h-full w-full items-center justify-center font-medium">
        <div className="text-muted-foreground max-w-md grid p-8 ">
          <BlurRevealElement className="font-medium mb-4 flex items-center gap-2 leading-none justify-between "><div className="flex gap-2"> <span className="font-bold text-foreground">Joaquin</span>  <ShimmerText variant="green"> available for work </ShimmerText></div>
          </BlurRevealElement>
          <div>

            <BlurReveal speedReveal={3}>
              I&apos;m a 21 y/o{" "}
              <span className="font-bold text-foreground">engineer</span>
              {" "}with data science and AI background. Currently studying at UCU.
              Currently working in a{" "}<span className="font-bold text-foreground">full suite</span>{" "}for Padel Clubs and players in Uruguay.
            </BlurReveal>

          </div>

          <div className="flex gap-4">
            <BlurRevealElement as="div" className="mt-4 inline-flex">
              <RichButton color="default" size="sm">
                <IconPaperPlane size="12px" />
                Contact me
              </RichButton>
            </BlurRevealElement>
            <BlurRevealElement as="div" className="mt-4 inline-flex">
              <CopyButton size="sm" value="joaquindbatista@gmail.com">
                My email
              </CopyButton>
            </BlurRevealElement>
          </div>


        </div>
      </div>
      <div className="p-8  grid place-items-center ">
        <ItemGroup className="max-w-md" >
          {projectList.map((project, index) => {
            const link = project.links.live || project.links.github
            return (
              <BlurRevealElement
                key={project.name}
                delay={index * projectRevealStep}
                speedReveal={0.5}
              >

                <Item
                  role="listitem"
                  render={
                    link ? (
                      <a href={link} target="_blank" rel="noreferrer" />
                    ) : undefined
                  }
                >
                  <ItemContent>
                    <ItemTitle className="text-base">
                      {project.name}
                      {link ? (
                        <IconWindowExpandBottomRightFill18
                          size="16"
                          className="text-muted-foreground opacity-0 transition-opacity duration-300 group-hover/item:opacity-100"
                        />
                      ) : null}
                    </ItemTitle>
                    <ItemDescription className="text-sm mb-1">{project.description}</ItemDescription>
                    <ItemDescription className="line-clamp-1 text-muted-foreground">
                      {project.stack.join(" · ")}
                    </ItemDescription>
                  </ItemContent>
                  <ItemContent>
                    <ItemDescription>
                      {project.year}
                    </ItemDescription>
                  </ItemContent>
                </Item>
              </BlurRevealElement>

            )
          })}
        </ItemGroup>
      </div>
    </div>
  )
}

export default App
