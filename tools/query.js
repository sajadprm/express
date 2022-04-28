const queryTools={};

queryTools.createSort=(plainSort)=>{
    const sortStringArr=plainSort ? plainSort.split(";") : {};
    const sort={}
   sortStringArr.forEach(sortString => {
   const key=sortString.split(":")[0]; 
    const value=sortString.split(":")[1]==="asc" ? 1 : -1;
    sort[key]=value;
       
   });

   return sort;
}

module.exports=queryTools;