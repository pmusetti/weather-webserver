function unixTime(time){
  var date = new Date(time * 1000);
  // Hours part from the timestamp
  if(date.getHours()<10){
    var hours = '0' + date.getHours();
  }else{
    var hours = date.getHours();
  }
  


  // Minutes part from the timestamp
  var minutes = "0" + date.getMinutes();
  // Seconds part from the timestamp
  var seconds = "0" + date.getSeconds();

  // Will display time in 10:30:23 format
  var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

  return formattedTime;

}



module.exports = unixTime