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

export type GroupRole = {
     id: number;
     name: string;
     description: string;
     rank: number;
     memberCount: number;
}

export type GroupRolesRequest = {
     groupId: number;
     roles: GroupRole[];
}

export type Group = {
     id: number;
     points: number;
     rankType: string;
     rank: string;
}

export type Rank = {
     name: string;
     rank: number;
     points: number;
     next_name: string;
     previous_name: string;
     obtainable: boolean;
     type: string;
}