import Link from "next/link";

const lastUpdated = "January, 2026";

export default function page() {
  return (
  <article className="prose mt-8 pb-16 dark:prose-invert">
    <div className="space-y-4">
      <h1 className="title text-5xl">privacy policy.</h1>
      <p>Last Updated: {lastUpdated}</p>
    </div>
    <div className="space-y-4">
      <h2 className="title text-3xl">Hey, Welcome!</h2>
      <p>
        Thanks for visiting! This <b>Privacy Policy</b> is here to explain how your
        information is (or more accurately, isn&#39;t) handled on my personal portfolio site. 
        I&#39;m a developer who values privacy just as much as clean code.
      </p>
      <h2 className="title">What I Collect (Almost Nothing)</h2>
      <p>
        This is a static portfolio website meant to showcase my projects, journey, and skills. 
        I don&#39;t collect personal data, run trackers, or use analytics tools that invade your privacy.
      </p>
      <h3>Contact Information</h3>
      <p>
        If you contact me through the form or email, that&#39;s the only time your information is seen.
        And even then, I&#39;ll only use it to reply to your message — that&#39;s it.
      </p>
      <h2 className="title">How I Use Your Info</h2>
      <p>Here&#39;s how any info you provide might be used:</p>
      <ul>
        <li>To respond to your queries or messages</li>
        <li>To understand your feedback and improve the site</li>
      </ul>
      <h2 className="title">Sharing Info? Nope.</h2>
      <p>
        I don&#39;t share, sell, or trade your personal info with anyone. If you&#39;ve accidentally sent
        something sensitive, just let me know — I&#39;ll help you out.
      </p>
      <h2 className="title">Security Matters</h2>
      <p>
        I&#39;ll always take reasonable steps to protect your data, but just a heads-up — no system is completely bulletproof.
        That said, there&#39;s barely any data here to protect in the first place.
      </p>
      <h2 className="title">Policy Updates</h2>
      <p>
        This policy was last updated on <b>{lastUpdated}</b>. If anything changes, you&#39;ll find the updated version right here. 
        No surprise changes, ever.
      </p>
      <h2 className="title">Let&#39;s Talk</h2>
      <p>
        Got questions or just want to connect? Reach out to me at{" "}
        <Link href="mailto:mvabhinand2005@gmail.com">mvabhinand2005@gmail.com</Link> or use the{" "}
        <Link href="/contact">contact form</Link>. I&#39;d be happy to hear from you!
      </p>
  
    </div>
  </article>
  );
}
