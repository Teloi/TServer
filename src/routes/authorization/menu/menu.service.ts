import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Menu } from 'src/entity/db-main/menu.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MenuService {

  constructor(
    @InjectRepository(Menu) private menuRepository: Repository<Menu>) {
  }

  // 查询所有菜单 非树状
  async getMunus() {
    return await this.menuRepository.find();
  }

  // 查询树状菜单树
  async getMenuTree() {
    let menuList: Menu[] = await this.menuRepository.find();

    const idMapping = menuList.reduce((acc, el, i) => {
      acc[el.Id] = i;
      return acc;
    }, {});

    let root = [];
    menuList.forEach(el => {
      // 判断根节点
      if (el.ParentId.toString() === '-1') {
        root.push(el);
        return;
      }
      // 用映射表找到父元素
      let parentEl = menuList[idMapping[el.ParentId]];
      // 把当前元素添加到父元素的`children`数组中
      parentEl['Children'] = [...(parentEl['Children'] || []), el];
    });

    return root;
  }

  // 新增根菜单
  async addRootMenu(menuName: string, menuCode: string): Promise<boolean> {
    const menu = new Menu();
    menu.MenuName = menuName;
    menu.MenuCode = menuCode;
    menu.ParentId = -1;
    this.menuRepository.insert(menu);
    return true;
  }




}

export class MenuTreeDto {
  Id: number;
  MenuName: string;
  MenuCode: string;
  ParentId: number;
  Children: MenuTreeDto[];
}