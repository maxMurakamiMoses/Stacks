import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function AccordionSection() {
  return (
    <Accordion
      type="single"
      collapsible
      className="min-w-[24rem] max-w-[24rem] xl:min-w-[35rem] xl:max-w-[35rem]"
    >

      <AccordionItem value="item-5">
        <AccordionTrigger>What does "Stacks" mean?</AccordionTrigger>
        <AccordionContent>
        Stacks refer to combinations of supplements, gadgets, and practices used together to achieve specific health or performance outcomes. They can include vitamins, nootropics, wearables, and biohacks.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-1">
        <AccordionTrigger>How can I contribute?</AccordionTrigger>
        <AccordionContent>
          We are always looking for amazing talent that can help. Passion and
          intensity are all that is needed! Programmers or content creators are
          a plus. Fill out the interest form{" "}
          <a
            href="https://forms.gle/GymkgSNYpoexwmfZ7"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "green", textDecoration: "underline" }}
          >
            here
          </a>
          .
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-2">
        <AccordionTrigger>
          How do you get your information on stacks? Is it accurate?
        </AccordionTrigger>
        <AccordionContent>
          Either through direct interview, email exchange, or a deep dive into
          their social media. We understand such information can be ever
          changing. If you think anything is inaccurate, you can let us know{" "}
          <a
            href="https://forms.gle/zpz6vmJsPEvwtM37A"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "green" }}
          >
            here
          </a>
          .
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-3">
        <AccordionTrigger>How are you funded?</AccordionTrigger>
        <AccordionContent>
          We are not funded. This is a labor of love :)
        </AccordionContent>
      </AccordionItem>


      <AccordionItem value="item-4">
        <AccordionTrigger>How do I join leaderboards?</AccordionTrigger>
        <AccordionContent>
          Please click "Join Leaderboard" below the leaderboard you wish to join on the leaderboards page. 
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-6">
        <AccordionTrigger>Do you provide medical advice?</AccordionTrigger>
        <AccordionContent>
        No, we do not provide medical advice. All the information provided is for educational purposes only. Always consult a healthcare provider before starting any new supplement or health routine.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-7">
        <AccordionTrigger>Can you pay for a higher spot on a leaderboard?</AccordionTrigger>
        <AccordionContent>
          No. Just be better.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-8">
        <AccordionTrigger>I want to include my company in the product list. How?</AccordionTrigger>
        <AccordionContent>
         Please contact us at EMAILADDRESS
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-9">
        <AccordionTrigger>Can I write an article?</AccordionTrigger>
        <AccordionContent>
          We are alwyas open to articles! Please contact EMAILADDRESS with your inquiry!
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-10">
        <AccordionTrigger>How can we get in contact?</AccordionTrigger>
        <AccordionContent>
          Please contact EMAILADDRESS
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
