import { useState, FC } from 'react';
import { Group, Code } from '@mantine/core';
import {
  IconSwitchHorizontal,
  IconLogout,
} from '@tabler/icons-react';
import styles from './Navbar.module.css';

export interface INavItem {
  link: string;
  label: string;
  icon: typeof IconLogout;
}

export interface SimpleNavbarProps {
  items: INavItem[]
}


const SimpleNavbar: FC<SimpleNavbarProps> = ({ items }) => {
  const [active, setActive] = useState('Billing');

  const links = items.map((item) => (
    <a
      className={styles.link}
      data-active={item.label === active || undefined}
      href={item.link}
      key={item.label}
      onClick={(event) => {
        event.preventDefault();
        setActive(item.label);
      }}
    >
      <item.icon className={styles.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </a>
  ));

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarMain}>
        <Group className={styles.header} justify="space-between">
          <h1>Eye Care</h1>
          <Code fw={700}>v3.1.2</Code>
        </Group>
        {links}
      </div>

      <div className={styles.footer}>
        <a
          href="#"
          className={styles.link}
          onClick={(event) => event.preventDefault()}
        >
          <IconSwitchHorizontal className={styles.linkIcon} stroke={1.5} />
          <span>Change account</span>
        </a>

        <a
          href="#"
          className={styles.link}
          onClick={(event) => event.preventDefault()}
        >
          <IconLogout className={styles.linkIcon} stroke={1.5} />
          <span>Logout</span>
        </a>
      </div>
    </nav>
  );
};

export default SimpleNavbar;