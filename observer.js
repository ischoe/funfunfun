const observer = (props) => {
    const state = Object.assign({}, props);
    return {
        get: (attr) => state[attr],
        set: (attr, val) => {
            if(typeof state.on === 'function') state.on({[attr] : { last: state[attr], next: val }});
            if(typeof state[attr + 'func'] === 'function') state[attr + 'func']({[attr] : { last: state[attr], next: val }});            
            state[attr] = val;
        },
        on: (what, cb) => what === 'change' ? state.on = cb : state[what + 'func'] = cb
    };
};


const user = observer({name : 'fred'});
user.on('change', data => console.log('Changed : ', data));
user.set('name', 'hans');
user.set('age', 20);

const animal = observer();
animal.on('change', data => console.log('Changed : ', data));
animal.set('name', 'bruno');
animal.set('name', 'axel f.');

const fish = observer({name : 'noname'});
fish.on('change', data => console.log('Changed : ', data));
fish.on('name', data => console.log('Changed on name: ', data));

fish.set('name', 'wanda');
fish.set('age', 1);
fish.set('name', 'parker');
