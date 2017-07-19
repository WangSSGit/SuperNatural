/**
 * Created by admin on 2017/5/17.
 */
import React from "react";
import {Link} from "dva/router";
import {Menu, Icon} from "antd";
import style from  "./home-layout.less";

const SubMenu = Menu.SubMenu;
const MenuItem = Menu.Item;

export default ({children}) => {
  return (
    <div>
      <header className={style.header}>
        <Link to="/">ReactManager</Link>
      </header>
      <main className={style.main}>
        <div className={style.menu}>
          <Menu mode="inline" theme="dark" style={{width: "240px"}}>
            <SubMenu key="user" title={<span><Icon type="user"/><span>User Manager</span></span>}>
              <MenuItem key="user-list">
                <Link to="/user/list">User List</Link>
              </MenuItem>
              <MenuItem key="user-add">
                <Link to="/user/add">Add User</Link>
              </MenuItem>
            </SubMenu>

            <SubMenu key="book" title={<span><Icon type="book"/><span>Book Manager</span></span>}>
              <MenuItem key="book-list">
                <Link to="/book/list">Book List</Link>
              </MenuItem>
              <MenuItem key="book-add">
                <Link to="/book/add">Add Book</Link>
              </MenuItem>
            </SubMenu>
          </Menu>
        </div>
        <div className={style.content}>
          {children}
        </div>
      </main>
    </div>
  );
};
