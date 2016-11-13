module.exports =  {
  drone_id : {},
  
  savedroneid : function(droneid){
    this.drone_id[droneid.id]= droneid;
  },
  listAlldrone_id : function(){
    var rtnValue =[];
    for (var item in this.drone_id) {
      rtnValue.push(this.drone_id[item]);
    };
    return rtnValue;
  },
  finddrone_id : function(id){
    return this.drone_id[id];
  }
};
