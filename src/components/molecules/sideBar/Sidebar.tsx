import { Briefcase, House } from "@phosphor-icons/react";

import styles from "./sideBar.module.scss";

function SideBar() {
  return (
    <>
      <aside className={styles.sideBar}>
        {asideData.map((item) => (
          <div key={item.title} className={styles.sideBar__category}>
            <div
              className={`${styles.sideBar__category__title} ${
                item.is_active ? styles.sideBar__category__title__active : ""
              }`}
            >
              {item.icon}
              <h2>{item.title}</h2>
            </div>
            <ul>
              {item.sub_titles.map((sub_title) => (
                <li
                  key={sub_title.name}
                  className={`${styles.sideBar__subCategory} ${
                    sub_title.is_active
                      ? styles.sideBar__subCategory__active
                      : ""
                  }`}
                >
                  {sub_title.name}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </aside>
      {}
    </>
  );
}

export default SideBar;

const asideData = [
  {
    title: "Dashboard",
    icon: <House size={26} />,
    sub_titles: [{ name: "Panel", is_active: false }],
    is_active: false,
  },
  {
    title: "Servicios",
    icon: <Briefcase size={26} />,
    sub_titles: [
      { name: "Registro de Marca", is_active: true },
      { name: "Asesoria Legal", is_active: false },
    ],
    is_active: true,
  },
];
