/**
 * Created by admin on 2017/6/12.
 */
export default {
    namespace: 'users',
    state: [
        {
            "name": "Dean Winchester",
            "age": 32,
            "gender": "male",
            "id": "380482"
        }
    ],
    reducers: {
        add(users, {user}){//question：第一个参数默认传的是什么？是当前module对应的state片段，还是整个app的state？
            return users.concat([user]);
        },
        delete(users, {userId}){//question：如果我想在一个action中改变多个module中的state该怎么做？
            let index = users.findIndex((user) => {
                return user.id == userId;
            });
            if(index != -1){
                users.splice(index, 1);
            }
            return users;
        },
        edit(users, {user}){
            let oldUser = users.find((item) => {
                return item.id == user.id;
            });
            oldUser = Object.assign(oldUser, user);
            return users;
        }
    },
    subscriptions: {},
    effects: {}
};