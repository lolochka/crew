crewApp.filter('experience',function(){
  return function(input){
    var obj = new Object(input);
    if ((obj.year !== undefined && obj.month !== undefined) && (obj.year !== 0 || obj.month !== 0)) {
      var month = obj.month;
      var year = obj.year;
      var date = new Date();
      var nowMonth = date.getMonth();
      var nowYear = date.getFullYear();
      var diffMonth;////need compile
      var diffYear;
      month === 0 ? diffMonth = 0 : diffMonth = nowMonth - month;
      year === 0 ? diffYear = 0 : diffYear = nowYear - year;
      if (diffMonth > 0) {
        if (diffYear > 0) {
          return diffYear + ' year(s) and ' + diffMonth + ' month(s)';
        } else if (diffYear === 0) {
          return diffMonth + ' month(s)';
        } else {
          return 'Have not started yet';
        }
      } else if (diffMonth === 0) {
        if (diffYear > 0) {
          return diffYear + ' year(s)';
        } else if (diffYear === 0) {
          return 'Do not have any experience';
        } else {
          return 'Have not started yet';
        }
      } else {
        diffMonth = diffMonth + 12;
        diffYear = diffYear - 1;
        if (diffYear > 0) {
          return diffYear + ' year(s) and ' + diffMonth + ' month(s)';
          } else if (diffYear === 0) {
            return diffMonth + ' month(es)';
          } else {
            return 'Have not started yet';
          }
        }//need compile
      } else {
        return false;
      }
  }
})