import { RichButton } from "./components/rich-button"
import { WordsStagger } from "./components/words-stagger"
import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowRight01Icon } from "@hugeicons/core-free-icons"
import IconPaperPlane from "./components/icon-paper-plane"
import { BlurReveal } from "./components/blur-reveal"

export function App() {
  return (
    <div className="grid min-h-svh min-w-screen grid-cols-2">
      <div className="flex h-full w-full items-center justify-center  p-8 text-sm leading-loose">
        <div className="text-muted-foreground">
          <p>
            <BlurReveal className="font-medium">Joaquin Batista</BlurReveal>
          </p>

          <p>
            <BlurReveal>
              I'm an AI
            </BlurReveal>
          </p>

          <span>            <BlurReveal>
            engineer            </BlurReveal>
          </span>
          engineer with data science background. Currently studying in UCU.
          <BlurReveal>
            We've already added the button component for you.
          </BlurReveal>
          <RichButton className="mt-2" color="default">
            <IconPaperPlane size="24px" />
            Button
          </RichButton>
        </div>

      </div>
      <div>
        <WordsStagger>Proyectos</WordsStagger>
      </div>
    </div>
  )

}

export default App
