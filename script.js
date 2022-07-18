var data = [
   {
      name: "Adil",
      recentlyPlayedWith: ["Ben", "Andy", "Rio", "Nader", "Giuliano", "Dali"],
   },
   {
      name: "Andy",
      recentlyPlayedWith: ["Adil", "Walter", "Chris", "Dan", "Ben"],
   },
   {
      name: "Dan",
      recentlyPlayedWith: ["Andy", "Rio", "Dennis", "John", "Bernard", "Ben"],
   },
   {
      name: "Ben",
      recentlyPlayedWith: [
         "Nader",
         "Dali",
         "Dan",
         "Carter",
         "Bruno",
         "Andy",
         "Adil",
      ],
   },
   {
      name: "Nader",
      recentlyPlayedWith: ["Adil", "Ben", "Arthur", "Walter"],
   },
];

/**
 * A group is an array of player names who have recently played with each other.
 * @param {*} players
 * @returns [[]]
 */
function getGroups(players) {
   let groups = [];
   players.forEach((p1) => {
      let playersPlayedWith = players
         .filter(
            (p2) =>
               p2.recentlyPlayedWith.includes(p1.name) && p2.name !== p1.name
         )
         .map((p2) => p2.name);
      playersPlayedWith.unshift(p1.name);
      playersPlayedWith.sort();
      groups.push(...[playersPlayedWith]);
   });

   return groups;
}

/**
 * Each member in a group must have played with each other member.
 * @param {*} groups
 * @param {*} players
 * @returns [[]]
 */
function getGroupWithPlayersThatPlayedWithEachOther(groups, players) {
   let newGroups = [];
   groups.forEach((group) => {
      let newGroup = [];
      group.forEach((player1) => {
         let hasPlayedWithAll = true;
         group
            .filter((player2) => player2 !== player1)
            .forEach((player2) => {
               if (
                  !players
                     .filter(
                        (p) =>
                           p.name === player1 &&
                           p.recentlyPlayedWith.includes(player2)
                     )
                     .pop()
               ) {
                  hasPlayedWithAll = false;
               }
            });
         if (hasPlayedWithAll) {
            newGroup.push(player1);
         }
      });
      newGroups.push(newGroup);
   });

   return newGroups;
}

/**
 * Each group must have at least two names, and duplicate groups must be discarded
 * @param {*} groups
 * @returns [[]]
 */
function cleanGroups(groups) {
   groups = groups.filter((g) => g.length >= 2);
   let stringArray = groups.map((g) => g.toString());
   groups = Array.from([...new Set(stringArray)].map((sa) => sa.split(",")));
   return groups;
}

/**
 * If a group is entirely contained in a larger group, it must be discarded in favor of the larger group.
 * @param {*} groups
 * @returns [[]]
 */
function discardContainedGroups(groups) {
   let newGroup = new Set();

   groups.forEach((g1) => {
      let isContainsEntirely = true;
      groups
         .filter(
            // filter to get groups bigger ot equal at length and not the same group
            (g2) => g2.length >= g1.length && g1.toString() !== g2.toString()
         )
         .forEach((g2) => {
            g1.forEach((p1) => {
               if (!g2.includes(p1)) {
                  isContainsEntirely = false;
               } else {
                  isContainsEntirely = true;
               }
            });
         });

      // if the group is unique
      if (!isContainsEntirely) {
         newGroup.add(g1.toString());
      }
   });

   return Array.from([...newGroup].map((sa) => sa.split(",")));
}


function groupPlayers(players) {
   // Players who aren't in the team of 5 players should be excluded from the results.

   let groups = getGroups(players);
   //    console.log("getGroups", groups);

   groups = getGroupWithPlayersThatPlayedWithEachOther(groups, players);
   //    console.log("GroupWithPlayersThatPlayedWithEachOther", groups);

   groups = cleanGroups(groups);
   //    console.log("cleanGroups", groups);

   groups = discardContainedGroups(groups);
//    console.log("discardContainedGroups", groups);

   return groups;
}

let groups = groupPlayers(data);
console.log("result", groups);
