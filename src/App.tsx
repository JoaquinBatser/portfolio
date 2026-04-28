import { RichButton } from "./components/rich-button"
import IconPaperPlane from "./components/icon-paper-plane"
import { BlurReveal } from "./components/blur-reveal"
import { BlurRevealElement } from "./components/blur-reveal-element"
import ShimmerText from "./components/shimmer-text"
import projects from "./data/projects.json"
import IconWindowExpandBottomRightFill18 from "./components/icon-link"
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemTitle,
} from "./components/ui/item"
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
  const projectList = [...(projects as Project[])].sort(
    (a, b) => b.year - a.year
  )
  const projectRevealStep = 0.08

  return (
    <div className="grid min-h-svh text-base md:grid-cols-2">
      <div className="grid place-items-center p-8">
        <div className="grid max-w-md text-muted-foreground">
          <BlurRevealElement className="mb-4 flex items-center justify-between gap-2 leading-none font-medium">
            <div className="flex gap-2">
              {" "}
              <span className="font-bold text-foreground">Joaquin</span>{" "}
              <ShimmerText variant="green"> available for work </ShimmerText>
            </div>
          </BlurRevealElement>
          <div>
            <BlurReveal speedReveal={3}>
              I&apos;m a 21 y/o{" "}
              <span className="font-bold text-foreground">engineer</span> with
              data science and AI background. Currently studying at UCU.
              Currently working in a{" "}
              <span className="font-bold text-foreground">full suite</span> for
              Padel Clubs and players in Uruguay.
            </BlurReveal>
          </div>

          <div className="flex gap-4">
            <BlurRevealElement as="div" className="mt-4 inline-flex">
              <RichButton color="default" size="sm">
                <IconPaperPlane size="12px" />
                Contact me
              </RichButton>
            </BlurRevealElement>
            <a href="/JoaquinBatista_CV.md" download="JoaquinBatista_CV.md">
              <BlurRevealElement as="div" className="mt-4 inline-flex">
                <CopyButton size="sm" value="joaquindbatista@gmail.com">
                  My CV
                </CopyButton>
              </BlurRevealElement>
            </a>
          </div>
        </div>
      </div>
      <div className="grid place-items-center p-8">
        <ItemGroup className="max-w-md">
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
                    <ItemDescription className="mb-1 text-sm">
                      {project.description}
                    </ItemDescription>
                    <ItemDescription className="line-clamp-1 text-muted-foreground">
                      {project.stack.join(" · ")}
                    </ItemDescription>
                  </ItemContent>
                  <ItemContent>
                    <ItemDescription>{project.year}</ItemDescription>
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
