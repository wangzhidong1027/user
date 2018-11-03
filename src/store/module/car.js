export default {
  state: {
    car: []
  },
  getters: {
    carNum:  state => {
      var number = 0
      for( let i of state.car){
        number += i.number
      }
      return number
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
    batch_DEL (state , Arr) {
      for(let i = 0;i <  Arr.length; i++){
        for(let k = 0;k <  state.car.length; k++){
          if ( state.car[k].id === Arr[i] ) {
            state.car.splice( k, 1);
            break
          }
        }
      }
      localStorage.setItem("car",JSON.stringify( state.car));
    },
    carInit (state) {
      if ( localStorage.getItem('car') ) {
        state.car = JSON.parse(localStorage.getItem('car'))
      }
    }
  },
  action: {

  }
}