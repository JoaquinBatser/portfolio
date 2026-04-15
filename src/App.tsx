import { RichButton } from "./components/rich-button"
import { WordsStagger } from "./components/words-stagger"
import IconPaperPlane from "./components/icon-paper-plane"
import { BlurReveal } from "./components/blur-reveal"
import { BlurRevealElement } from "./components/blur-reveal-element"
import IconUser from "./components/icon-user"
import IconDuplicatePlus from "./components/icon-copy"

export function App() {
  return (
    <div className="grid min-h-svh min-w-screen grid-cols-2">
      <div className="flex h-full w-full items-center justify-center p-8 text-base  font-medium">
        <div className="text-muted-foreground max-w-md grid">
          <BlurRevealElement className="font-medium mb-4 flex items-center gap-2 leading-none "> Joaquin</BlurRevealElement>
          <div className="grid gap-1 ">

            <BlurReveal>
              I&apos;m a 21 y/o{" "}
              <span className="font-bold text-foreground">engineer</span>
              {" "}with data science and AI background. Currently studying at UCU.
            </BlurReveal>


            <BlurReveal>
              Currently working in a  {" "}<span className="font-bold text-foreground">full suite</span>{" "} for Padel Clubs and players in Uruguay. NextJs website and Expo app
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
      <div>
        <WordsStagger>Proyectos</WordsStagger>
      </div>
    </div>
  )
}

export default App
