import { FC } from 'react';
import { IconLogout } from '@tabler/icons-react';
import styles from './Navbar.module.css';
import { useAppDispatch } from '../../store';
import { userAuthActions } from '../../features/UserAuthentication';
import { NavLink } from 'react-router-dom';

export interface INavItem {
  link: string;
  label: string;
  icon: typeof IconLogout;
}

export interface SimpleNavbarProps {
  items: INavItem[];
}

const SimpleNavbar: FC<SimpleNavbarProps> = ({ items }) => {
  const dispatch = useAppDispatch();

  const links = items.map((item) => (
    <NavLink
      className={({ isActive }) =>
        isActive ? styles.link + ' ' + styles.active : styles.link
      }
      key={item.label}
      to={item.link}
    >
      <item.icon className={styles.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </NavLink>
  ));

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarMain}>
        
        {links}
      </div>

      <div className={styles.footer}>
        <a
          href="#"
          className={styles.link}
          onClick={() => dispatch(userAuthActions.logout())}
        >
          <IconLogout className={styles.linkIcon} stroke={1.5} />
          <span>خروج</span>
        </a>
      </div>
    </nav>
  );
};

export default SimpleNavbar;
