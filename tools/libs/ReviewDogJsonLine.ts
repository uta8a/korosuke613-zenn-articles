export type DiagnosticResult = {
  diagnostics: Diagnostic[];
};

export type Diagnostic = {
  message: string;
  location: Location;
  suggestions?: Suggestion[];
};

type Location = {
  path: string;
  range: Range;
};

type Range = {
  start: Position;
  end?: Position;
};

type Position = {
  line?: number;
  column?: number;
};

type Suggestion = {
  range: Range;
  text: string;
};
