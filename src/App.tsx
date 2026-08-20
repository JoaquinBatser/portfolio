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
import { useRef, useState, type ComponentType } from "react"
import { useSmoothCorners } from "@lisse/react"
import { CopyButton } from "./components/copy-button"
import IconSuitcase3FillDuo18 from "./components/icon-suitcase"
import IconBookBookmarkFillDuo18 from "./components/icon-book"
import { GithubDark } from "./components/ui/svgs/githubDark"
import { GithubLight } from "./components/ui/svgs/githubLight"

type Project = {
  name: string
  year: number
  description: string
  stack: string[]
  links: {
    live?: string
    github?: string
  },
  category: string,
  image?: string
}

function ProjectImage({ src, alt }: { src: string; alt: string }) {
  const ref = useRef<HTMLDivElement>(null)
  useSmoothCorners(ref, { radius: 30, smoothing: 0.65 })
  return (
    <div ref={ref} className="w-full">
      <img src={src} alt={alt} loading="lazy" className="aspect-video w-full object-cover" />
    </div>
  )
}

const CATEGORY_ICONS: Record<string, ComponentType<{ size?: string }>> = {
  work: IconSuitcase3FillDuo18,
  studies: IconBookBookmarkFillDuo18,
}

function groupByCategory(projects: Project[]) {
  return projects.reduce<Record<string, Project[]>>((acc, project) => {
    ;(acc[project.category] ??= []).push(project)
    return acc
  }, {})
}

export function App() {
  const projectList = [...(projects as Project[])].sort(
    (a, b) => b.year - a.year
  )
  const grouped = groupByCategory(projectList)
  const [activeCategory, setActiveCategory] = useState("work")
  const projectRevealStep = 0.08

  return (
    <div className="flex h-dvh flex-col overflow-hidden text-base md:grid md:grid-cols-2">
      <div className="flex min-h-0 shrink-0 flex-col p-8 md:h-full md:grid md:place-items-center">
        <div className="grid max-w-md text-muted-foreground">
          <BlurRevealElement className="mb-4 flex items-center justify-between gap-2 leading-none font-medium">
            <div className="flex gap-2">
              {" "}
              <span className="font-bold text-foreground">Joaquin Batista</span>{" "}
              <ShimmerText variant="red"> currently employed </ShimmerText>
              {/*<ShimmerText variant="green"> available for work </ShimmerText>*/}
            </div>
          </BlurRevealElement>
          <div>
            <BlurReveal speedReveal={3} className="text-pretty">
              I&apos;m a 21 y/o{" "}
              <span className="font-bold text-foreground">student</span> from Uruguay with
              data science, web and mobile development background. Currently at UCU.
              Mainly working in a{" "}
              <span className="font-bold text-foreground">full suite</span> for
              padel clubs and players in Uruguay, and an <span className="font-bold text-foreground">e-commerce</span> for Chajá.
            </BlurReveal>
          </div>

          <div className="flex items-center gap-4">
            <a href="mailto:joaquindbatista@gmail.com">
              <BlurRevealElement as="div" className="mt-4 inline-flex">
                <RichButton color="default" size="sm">
                  <IconPaperPlane size="12px" />
                  Contact me
                </RichButton>
              </BlurRevealElement>
            </a>
            <a href="/JoaquinBatista_CV.md" download="JoaquinBatista_CV.md">
              <BlurRevealElement as="div" className="mt-4 inline-flex">
                <CopyButton size="sm" value="joaquindbatista@gmail.com">
                  My CV
                </CopyButton>
              </BlurRevealElement>
            </a>
            <BlurRevealElement as="div" className="mt-4 inline-flex">
              <a
                href="https://github.com/JoaquinBatser"
                target="_blank"
                rel="noreferrer"
                className="inline-block"
              >
                <GithubDark className="hidden w-5 opacity-25 transition-opacity duration-300 hover:opacity-90 dark:block" />
                <GithubLight className="w-5 opacity-25 transition-opacity duration-300 hover:opacity-90 dark:hidden" />
              </a>
            </BlurRevealElement>
          </div>
        </div>
      </div>
      <div className="flex min-h-0 flex-1 flex-col items-center justify-center p-8">
        <div className="flex h-full w-full max-w-md flex-col gap-4">
          <div className="flex shrink-0 items-center gap-4 text-sm">
            {Object.keys(grouped).map((category) => {
              const Icon = CATEGORY_ICONS[category]
              const isActive = activeCategory === category
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  className={
                    isActive
                      ? "flex items-center gap-2 font-medium text-foreground"
                      : "flex items-center gap-2 text-muted-foreground transition-colors duration-200 hover:text-foreground"
                  }
                >
                  {Icon ? <Icon size="16px" /> : null}
                  {category}
                </button>
              )
            })}
          </div>
          <div className="relative grid min-h-0 flex-1 gap-8 overflow-y-auto scrollbar-hide">
            <div className="pointer-events-none sticky top-0 z-10 h-8 shrink-0 bg-gradient-to-b from-background to-transparent" />
            <ItemGroup>
              {grouped[activeCategory]?.map((project, index) => {
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
                            <ItemDescription className="mb-1 text-base mr-8">
                              {project.description}
                            </ItemDescription>
                            <ItemDescription className="line-clamp-1 text-muted-foreground">
                              {project.stack.join(" · ")}
                            </ItemDescription>
                          </ItemContent>
                          <ItemContent>
                            <ItemDescription className="text-base">{project.year}</ItemDescription>
                          </ItemContent>
                          {project.image ? (
                            <div className="mt-2 w-full">
                              <ProjectImage src={project.image} alt={project.name} />
                            </div>
                          ) : null}
                        </Item>
                      </BlurRevealElement>
                    )
                  })}
            </ItemGroup>
            <div className="pointer-events-none sticky bottom-0 z-10 h-8 shrink-0 bg-gradient-to-t from-background to-transparent" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
