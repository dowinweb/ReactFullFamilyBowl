/**
 * Created by dongwei on 2017/4/6.
 */
import React from 'react';
import HomeLayout from '../layouts/HomeLayout';
import UserEditor from '../components/UserEditor';

class UserEdit extends React.Component{
    constructor(props){
        super(props);
        this.state={
            user:null
        }
    }
    componentWillMount(){
        const userId = this.context.router.params.id;
        // 根据路由中名为id的参数来调用接口获取用户数据,
        fetch('http://localhost:3000/user/'+userId)
            .then(res=>res.json())
            .then(res=>{
                this.setState({
                    user:res
                })
            });
    }
    render(){
        const {user} = this.state;
        return(
            <HomeLayout title="编辑用户">
            {
                // 当user数据未就绪时,不应该展示出编辑器以避免用户混乱或者误操作,故使用三元运算符
                // 有值时渲染UserEditor 组件,否则显示文本'加载中';
                user ? <UserEditor editTarget={user} />:'加载中...'
            }
            </HomeLayout>
        )
    }
}

UserEdit.contextTypes={
    router:React.PropTypes.object.isRequired
};

export default UserEdit;