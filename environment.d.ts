declare global {
     namespace NodeJS {
          interface ProcessEnv {
               token: string;
               guildId: string;
               environment: "dev" | "prod" | "debug";
               mongodbUsername: string;
               mongodbPassword: string;
          }
     }
}

export {};