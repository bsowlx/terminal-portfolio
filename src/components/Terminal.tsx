"use client";

import React from "react";

type HistoryItem = {
  id: string;
  command: string;
  output: React.ReactNode;
};

const COMMANDS = [
  "help",
  "about",
  "skills",
  "projects",
  "contact",
  "clear",
];

function now(): string {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export default function Terminal() {
  const [input, setInput] = React.useState("");
  const [history, setHistory] = React.useState<HistoryItem[]>([{
    id: cryptoRandomId(),
    command: "welcome",
    output: (
      <div className="space-y-1">
        <p>
          <span className="text-emerald-400">{now()}</span> — {"Welcome to Baiastan's terminal."}
        </p>
        <p>Type <span className="text-amber-400">help</span> to see available commands.</p>
      </div>
    )
  }]);
  const [, setHistoryIndex] = React.useState<number | null>(null);
  const [submittedCommands, setSubmittedCommands] = React.useState<string[]>([]);

  const endRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  React.useEffect(() => {
    inputRef.current?.focus();
  }, []);

  function cryptoRandomId() {
    // In browsers this exists; fallback for some environments/TS lib targets
    if (typeof crypto !== "undefined") {
      const c = crypto as unknown as { randomUUID?: () => string };
      if (typeof c.randomUUID === "function") {
        return c.randomUUID();
      }
    }
    return Math.random().toString(36).slice(2);
  }

  function print(command: string, output: React.ReactNode) {
    setHistory((h) => [...h, { id: cryptoRandomId(), command, output }]);
  }

  function handleCommand(cmdRaw: string) {
    const cmd = cmdRaw.trim();
    if (!cmd) return;
    setSubmittedCommands((c) => [...c, cmd]);
    setHistoryIndex(null);

    switch (cmd.toLowerCase()) {
      case "help":
        print(cmd, (
          <div className="space-y-1">
            <Line>Available commands:</Line>
            <ul className="list-disc ml-6">
              {COMMANDS.map((c) => (
                <li key={c}><Code>{c}</Code></li>
              ))}
            </ul>
          </div>
        ));
        break;
      case "about":
        print(cmd, (
          <div className="space-y-1">
            <Line>
              {"Hi, I'm "}<b>Baiastan</b>{" — a developer, lifter, runner and a really nice friend(Test me)."}
            </Line>
            <Line>
              I use TypeScript/Javascript, React/Next.js, and Tailwind for frontend.
            </Line>
            <Line>
              And Express, MongoDB, Socket.io, (Nest, PostgreSQL) for backend
            </Line>
          </div>
        ));
        break;
      case "skills":
        print(cmd, (
          <div className="space-y-2">
            <Line>Core stack:</Line>
            <Badges items={["TypeScript/Javascript", "React", "Next.js", "TailwindCSS", "Node.js", "Express", "Socket.io", "Nest", "PostgreSQL"]} />
            <Line>Tools:</Line>
            <Badges items={["Git", "Vite", "Prisma", "PostgreSQL", "Zod", "Zustand", "Axios"]} />
          </div>
        ));
        break;
      case "projects":
        print(cmd, (
          <div className="space-y-1">
            <Line>Selected projects:</Line>
            <ListLink label="Portfolio" href="#" desc="This site - terminal-themed intro" />
            <ListLink label="GuideMe" href="https://github.com/GDGoC-GIST/guide-me-fe" desc="AI Course Registration Guide" />
            <ListLink label="Chatik" href="https://github.com/bsowlx/chat-app" desc="Realtime Chat App created during Infossible Challenge" />
          </div>
        ));
        break;
      case "contact":
        print(cmd, (
          <div className="space-y-1">
            <Line>Email: <a className="text-sky-400 hover:underline" href="mailto:st.baiastan@gm.gist.ac.kr">st.baiastan@gm.gist.ac.kr</a></Line>
            <Line>GitHub: <a className="text-sky-400 hover:underline" href="https://github.com/bsowlx" target="_blank" rel="noreferrer">github.com/bsowlx</a></Line>
          </div>
        ));
        break;
      case "clear":
        setHistory([]);
        break;
      default:
        print(cmd, (
          <Line>
            Command not found: <Code>{cmd}</Code>. Type <Code>help</Code>.
          </Line>
        ));
    }
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const val = input;
    if (!val.trim()) return;
    // Echo the command line before printing output
    setHistory((h) => [
      ...h,
      {
        id: cryptoRandomId(),
        command: val,
        output: (
          <span className="opacity-70">{now()}</span>
        )
      },
    ]);
    handleCommand(val);
    setInput("");
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    // History navigation
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (submittedCommands.length === 0) return;
      setHistoryIndex((idx) => {
        const next = idx === null ? submittedCommands.length - 1 : Math.max(0, idx - 1);
        setInput(submittedCommands[next] ?? "");
        queueMicrotask(() => inputRef.current?.setSelectionRange(input.length, input.length));
        return next;
      });
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (submittedCommands.length === 0) return;
      setHistoryIndex((idx) => {
        if (idx === null) return null;
        const next = Math.min(submittedCommands.length, idx + 1);
        if (next === submittedCommands.length) {
          setInput("");
          return null;
        }
        setInput(submittedCommands[next] ?? "");
        queueMicrotask(() => inputRef.current?.setSelectionRange(input.length, input.length));
        return next;
      });
    } else if (e.key === "Tab") {
      // Simple autocomplete
      e.preventDefault();
      const match = COMMANDS.find((c) => c.startsWith(input.toLowerCase()));
      if (match) setInput(match);
    }
  }

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Window chrome */}
      <div className="rounded-t-xl border border-zinc-800 bg-zinc-900/80 backdrop-blur">
        <div className="flex items-center gap-2 p-3 border-b border-zinc-800">
          <div className="flex gap-2">
            <Dot className="bg-rose-500" />
            <Dot className="bg-amber-400" />
            <Dot className="bg-emerald-500" />
          </div>
          <div className="ml-3 text-xs text-zinc-400">baiastan@portfolio: ~</div>
        </div>

        {/* Output area */}
        <div className="p-4 font-mono text-sm text-zinc-200 min-h-[45vh] max-h-[65vh] overflow-y-auto" aria-live="polite">
          {history.map((item) => (
            <div key={item.id} className="mb-3">
              {item.command !== "welcome" && (
                <div className="flex flex-wrap gap-2">
                  <span className="text-emerald-400">{now()}</span>
                  <span className="text-zinc-400">baiastan@portfolio</span>
                  <span className="text-zinc-500">$</span>
                  <span className="text-zinc-200">{item.command}</span>
                </div>
              )}
              <div className="mt-1 leading-relaxed">{item.output}</div>
            </div>
          ))}
          <div ref={endRef} />
        </div>

        {/* Input line */}
        <form onSubmit={onSubmit} className="flex items-center gap-2 p-4 border-t border-zinc-800">
          <span className="text-emerald-400 font-mono">$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="Type a command. Try: help"
            className="flex-1 bg-transparent outline-none text-zinc-100 placeholder:text-zinc-500 font-mono"
            aria-label="Terminal input"
            autoComplete="off"
          />
        </form>
      </div>

      {/* Quick actions */}
      <div className="flex flex-wrap gap-2 mt-3">
        {COMMANDS.map((c) => (
          <button
            key={c}
            onClick={() => {
              setInput(c);
              // Submit automatically for convenience
              setTimeout(() => handleCommand(c), 0);
            }}
            className="px-3 py-1 rounded border border-zinc-700 text-xs text-zinc-300 hover:bg-zinc-800"
          >
            {c}
          </button>
        ))}
      </div>
    </div>
  );
}

function Dot({ className }: { className?: string }) {
  return <span className={`inline-block h-3 w-3 rounded-full ${className ?? ""}`} />;
}

function Line({ children }: { children: React.ReactNode }) {
  return <p className="whitespace-pre-wrap">{children}</p>;
}

function Code({ children }: { children: React.ReactNode }) {
  return (
    <code className="px-1 py-0.5 rounded bg-zinc-800/80 text-zinc-100 border border-zinc-700">
      {children}
    </code>
  );
}

function Badges({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((t) => (
        <span key={t} className="text-xs px-2 py-1 rounded-full border border-zinc-700 bg-zinc-800/70">{t}</span>
      ))}
    </div>
  );
}

function ListLink({ label, href, desc }: { label: string; href: string; desc?: string }) {
  return (
    <div className="leading-tight">
      <a className="text-sky-400 hover:underline" href={href} target="_blank" rel="noreferrer">{label}</a>
      {desc ? <span className="text-zinc-400"> — {desc}</span> : null}
    </div>
  );
}