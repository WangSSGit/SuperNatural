/**
 * Created by admin on 2017/5/16.
 */
export default {
    namespace: 'count',
    state: 0,
    reducers: {
        add(count){
            return count + 1;
        },
        minus(count){
            return count - 1;
        }
    }
};