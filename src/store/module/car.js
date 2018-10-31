export default {
  state: {
    car: []
  },
  getters: {
    carNum:  state => {
      var number = 0
      for( let i of state.car){
        number += state.car[i].number
      }
    }
  },
  mutations: {
    ADD_CAR (state,Obj) {
      for( let i = 0;i <  state.car.length; i++){
        if ( state.car[i].id === Obj.id ) {
          state.car[i].number = Obj.number;
          localStorage.setItem("car",JSON.stringify( state.car));
          return
        }
      }
      state.car.push( Obj );
      localStorage.setItem("car",JSON.stringify( state.car));
    },
    DEL_CAR (state,Obj) {
      for( let i = 0;i <  state.car.length; i++){
        if ( state.car[i].id === Obj.id ) {
          if( Obj.number === 0 ){
            state.car.splice(i, 1);
            return
          }else{
            state.car[i].number = Obj.number;
            localStorage.setItem("car",JSON.stringify( state.car));
            return
          }
        }
      }
    },
    batch_DEL (state , Arr) {
      for(let i = 0;i <  Arr.length; i++){
        for(let k = 0;k <  state.car.length; k++){
          if ( state.car[k].id === Arr[i].id ) {
            state.car.splice(k, 1);
            break
          }
        }
      }
    }
  },
  action: {

  }
}