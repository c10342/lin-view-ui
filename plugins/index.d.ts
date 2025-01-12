export declare function ZUIResolver(): {
  type: "component";
  resolve: (name: string) =>
    | {
        name: string;
        from: string;
        sideEffects: string[];
      }
    | undefined;
};
