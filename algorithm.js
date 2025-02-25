function getTeamData(team, games) {

  let gamesPlayed = 0
  let vals = 0
  let offensiveRebounds = 0
  let turnovers = 0
  let totalShotAttempts = 0
  let ftAttempts= 0
  let ftMakes= 0

  for(let i =0; i < games.length; i++){
    if(games[i][2] === team){
      currVal =((games[i][22]/games[i][21])*0.66+games[i][24]/games[i][23])/2
      totalShotAttempts += games[i][21] + games[i][23]
      offensiveRebounds += games[i][9]
      ftAttempts += games[i][16]
      ftMakes += games[i][17]
      turnovers += games[i][6]
      intVal = 0
      if(currVal != "NA"){
        intVal = Number(currVal)
      }
      vals += intVal
      gamesPlayed +=1
    }
  }
  // current val calv
  //10-20
  let turnoverCalc = turnovers/gamesPlayed
  // avg make% * rebound% + ftr * ftm * 1.5(coeff)
  let finalVal= (vals/gamesPlayed)*(offensiveRebounds/gamesPlayed) + (1+(ftAttempts/totalShotAttempts))**2
  finalVal = finalVal /turnoverCalc
  return [team, gamesPlayed, vals, finalVal, offensiveRebounds/gamesPlayed, (vals/gamesPlayed), turnovers/gamesPlayed, (totalShotAttempts-offensiveRebounds)/gamesPlayed, ftAttempts/totalShotAttempts, ftMakes/ftAttempts]
}

function sortFunction(a, b) {
    if (a[3] === b[3]) {
        return 0;
    }
    else {
        return (a[3] < b[3]) ? 1 : -1;
    }
}
function writeDataTest(){
   const names = [
    "south carolina gamecocks",
    "tennessee lady volunteers",
    "iowa state cyclones",
    "iowa hawkeyes",
    "lsu tigers",
    "louisville cardinals",
    "oregon ducks",
    "kentucky wildcats",
    "arizona wildcats",
    "notre dame fighting irish",
    "texas longhorns",
    "baylor bears",
    "indiana hoosiers",
    "kansas state wildcats",
    "michigan wolverines",
    "nebraska cornhuskers",
    "arkansas razorbacks",
    "ohio state buckeyes",
    "purdue boilermakers",
    "alabama crimson tide",
    "georgia lady bulldogs",
    "michigan state spartans",
    "stanford cardinal",
    "ole miss rebels",
    "new mexico lobos",
    "florida gators",
    "utah utes",
    "missouri tigers",
    "gonzaga bulldogs",
    "south dakota state jackrabbits",
    "kansas jayhawks",
    "oklahoma sooners",
    "georgia tech yellow jackets",
    "south dakota coyotes",
    "florida state seminoles",
    "miami hurricanes",
    "virginia tech hokies",
    "toledo rockets",
    "middle tennessee blue raiders",
    "ucf knights",
    "northwestern wildcats",
    "colorado buffaloes",
    "ucla bruins",
    "wyoming cowgirls",
    "montana lady griz",
    "drake bulldogs",
    "byu cougars",
    "washington state cougars",
    "belmont bruins",
    "missouri state lady bears",
    "depaul blue demons",
    "green bay phoenix",
    "dayton flyers",
    "south florida bulls",
    "creighton bluejays",
    "little rock trojans",
    "oral roberts golden eagles",
    "elon phoenix",
    "marquette golden eagles",
    "northern iowa panthers",
    "florida gulf coast eagles",
    "troy trojans",
    "north texas mean green",
    "jackson state lady tigers",
    "idaho state bengals",
    "tulsa golden hurricane",
    "ut arlington mavericks",
    "youngstown state penguins",
    "southern miss lady eagles",
    "tennessee tech golden eagles",
    "montana state bobcats",
    "alabama state lady hornets",
    "tulane green wave",
    "kansas city roos",
    "southern illinois salukis",
    "stephen f austin ladyjacks",
    "western michigan broncos",
    "louisiana tech lady techsters",
    "texas state bobcats",
    "memphis tigers",
    "colorado state rams",
    "akron zips",
    "nevada wolf pack",
    "unlv lady rebels",
    "ball state cardinals",
    "marshall thundering herd",
    "western kentucky lady toppers",
    "murray state racers",
    "ohio bobcats",
    "uc davis aggies",
    "illinois state redbirds",
    "charlotte 49ers",
    "iu indianapolis jaguars",
    "houston cougars",
    "mercer bears",
    "kent state golden flashes",
    "long beach state beach",
    "hawaii rainbow wahine",
    "se louisiana lady lions"
];
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("games_2022")
  var data =  sheet.getDataRange().getValues();
  
  games = data.slice(1,data.length)
  console.log(names.length)
  let data_2d = []
  for (let i =0; i <names.length; i++){
      let data = getTeamData(names[i], games)
      data_2d.push(data)
      console.log(i)
  }
  data_2d.sort(sortFunction)
  data_2d.unshift(["Team name", "Games played","Total make %", "aarosh's secret formula", "avg offensive rebound", 'avg make %', "turnovers per game", "OBR%", "FTR%", "free throw make%"]);
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("aarosh's secret formula")
  var range = sheet.getRange(1,1,data_2d.length, data_2d[0].length)
  range.setValues(data_2d)
}
