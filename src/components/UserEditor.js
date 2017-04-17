/**
 * Created by dongwei on 2017/4/6.
 */
import React from 'react';
import formProvider from '../utils/formProvider';
import FormItem from '../components/FormItem';
import HomeLayout from '../layouts/HomeLayout';

class UserEditor extends React.Component {
    constructor(){
        super();
        // this.state = {
        //     name: '',
        //     age: 0,
        //     gender:''
        // }
        //    为了对表单的值进行验证
        this.state={
            form:{
                name:{
                    valid:false,
                    value:'',
                    error:''
                },
                age:{
                    valid:false,
                    value:0,
                    error:''
                },
                gender:{
                    valid:false,
                    value:'',
                    error:''
                }
            }
        }
    }
    componentWillMount(){
        const {editTarget, setFormValues} = this.props;
        if(editTarget){
            setFormValues(editTarget);
        }
    }
    
    //field是键名,value是键值
    // handleValueChange(field, value, type='string'){
    //     if(type==='number'){
    //         value=+value;
    //     }
    //
    //     const {form} = this.state;
    //     // 在这里已经统一将valid改成了true;
    //     const newFieldObj = {value, valid:true, error:''};
    //
    //     switch(field){
    //         case 'name': {
    //             if(value.length >= 5){
    //                 newFieldObj.error='用户名最多4个字符';
    //                 newFieldObj.valid = false;
    //             }else if(value.length===0){
    //                 newFieldObj.error = '请输入用户名';
    //                 newFieldObj.valid=false;
    //             }
    //             break;
    //         }
    //
    //         case 'age':{
    //             if(value>100||value<=0){
    //                 newFieldObj.error = '请输入1~100之间的数字';
    //                 newFieldObj.valid = false;
    //             }
    //             break;
    //         }
    //         case 'gender':{
    //             if(!value){
    //                 newFieldObj.error='请选择性别';
    //                 newFieldObj.valid = false;
    //             }
    //             break;
    //         }
    //     }
    //
    //     this.setState({
    //         form:{
    //             ...form,
    //             [field]:newFieldObj
    //         }
    //     });
    // }

    //在这里处理提交过来的数据
    handleSubmit(e){
        //    阻止表单submit事件自动跳转页面的动作.
        e.preventDefault();
        // alert(JSON.stringify(this.state));
        // const {form:{name,age,gender}} = this.state;
        const { form:{name,age,gender}, formValid, editTarget } = this.props;
        // 通过editTarget来判断这次的操作是添加操作还是编辑操作,并根据当前的操作切换调用接口url和method
        let editType = '添加';
        let apiUrl = 'http://localhost:3000/user';
        let method = 'post';
        if(editTarget){
            editType='编辑';
            apiUrl += '/'+editTarget.id;
            method='put';
        }
        // if(!name.valid||!age.valid||!gender.valid){
        //     alert("请填写正确的信息然后重试");
        //     return;
        // }
        if(!formValid){
            alert("请填写正确的信息然后重试");
            return;
        }

        fetch(apiUrl,{
            method,
            // 使用fetch提交的json数据需要使用JSON.stringify转换为字符串
            body:JSON.stringify({
                name:name.value,
                age:age.value,
                gender:gender.value
            }),
            headers:{
                'Content-Type':'application/json'
            }
        }).then((res)=>res.json())
            .then((res)=>{
                //当添加成功时,返回的json对象中应包含一个有效的id字段
                //所以可以使用res.id来判断添加是否成功
                console.log(res);
                if(res.id){
                    alert(editType+'用户成功');
                    this.context.router.push('/user/list');
                    return;
                    // 未跳转时,填写完添加了一次用户后就清空表单.
                    // this.setState({
                    //     form:{
                    //         name:{
                    //             valid:false,
                    //             value:'',
                    //             error:''
                    //         },
                    //         age:{
                    //             valid:false,
                    //             value:0,
                    //             error:''
                    //         },
                    //         gender:{
                    //             valid:false,
                    //             value:'',
                    //             error:''
                    //         }
                    //     }
                    // });
                }else{
                    alert(editType+'失败');
                }
            })
    }
    render() {
        // const {name,age,gender} = this.state.form;
        const {form:{name,age,gender}, onFormChange} = this.props;
        return(
            <HomeLayout>
                <form onSubmit={(e)=>this.handleSubmit(e)}>
                    <FormItem label="用户名: " valid={name.valid} error={name.error}>
                        <input type="text" value={name.value} onChange={(e)=>onFormChange('name',e.target.value)}/>
                    </FormItem>
                    <br/>
                    <FormItem label="年龄: " valid={age.valid} error={age.error}>
                        <input type="number" value={age.value||''} onChange={(e)=>onFormChange('age',+e.target.value)}/>
                    </FormItem>
                    <br/>
                    <FormItem label="性别: " valid={gender.valid} error={gender.error}>
                        <select value={gender.value} onChange={(e)=>onFormChange('gender',e.target.value)}>
                            <option value="">请选择</option>
                            <option value="male">男</option>
                            <option value="female">女</option>
                        </select>
                    </FormItem>
                    <br/>
                    <br/>
                    <input type="submit" value="提交"/>
                </form>
            </HomeLayout>
        )
    }
}

UserEditor.contextTypes={
    router: React.PropTypes.object.isRequired
};

UserEditor = formProvider({
    name: {
        defaultValue :'',
        rules:[{
            pattern:val => val.length>0,
            error:'请输入用户名吧'
        },{
            pattern:/^.{1,4}$/,
            error:'用户名最多四个字符'
        }]
    },
    age:{
        defaultValue: 0,
        rules:[{
            pattern:val=> (val>=1 && val<=100),
            error:'请输入1~100的年龄'
        }]
    },
    gender:{
        defaultValue:0,
        rules:[{
            pattern:val=>!!val,
            error:'请选择性别'
        }]
    }
})(UserEditor);


export default UserEditor;