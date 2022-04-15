export type GroupRequest = {
     group: {
          id: number;
          name: string;
          description: string;
          owner: {
               buildersClubMembershipType: string;
               userId: number;
               username: string;
               displayName: string;
          },
          shout: string | null;
          memberCount: number;
          isBuildersClubOnly: boolean;
          publicEntryAllowed: boolean;
     },
     role: {
          id: number;
          name: string;
          rank: number;
     }
}

export type Group = {
     id: number;
     points: number;
     rankType: string;
     rank: string;
}