module.exports =  {
  Mac-Adress : {},
  
  savemacadress : function(macadress){
    this.Mac-Adress[macadress.id]= macadress;
  },
  listAllMac-Adress : function(){
    var rtnValue =[];
    for (var item in this.Mac-Adress) {
      rtnValue.push(this.Mac-Adress[item]);
    };
    return rtnValue;
  },
  findMac-Adress : function(id){
    return this.Mac-Adress[id];
  }
};
