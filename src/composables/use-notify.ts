import { Notify } from 'quasar';

export function useNotify() {
  function success(message?: string, icon?: string) {
    return Notify.create({
      color: 'teal-1',
      message,
      textColor: 'teal',
      icon,
    });
  }

  function error(message?: string, icon?: string) {
    return Notify.create({
      message,
      icon,
      textColor: 'red',
      color: 'red-1',
    });
  }

  function info(msg?: string, caption?: string, time?: number, icon?: string) {
    return Notify.create({
      message: !msg
        ? ' '
        : `<div style="font-size:17px;font-weight:500;">${msg}</div>`,
      icon: !icon ? 'fas fa-info-circle' : icon,
      caption: !caption
        ? ' '
        : `<div style="font-size:14px;font-weight:500;">${caption}</div>`,
      textColor: 'primary',
      color: 'primary-color-100',
      classes: 'info',
      timeout: !time ? 3000 : time,
      html: true,
    });
  }

  function warn(msg?: string, caption?: string, time?: number, icon?: string) {
    return Notify.create({
      message: !msg
        ? ' '
        : `<div style="font-size:17px;font-weight:500;">${msg}</div>`,
      icon: !icon ? 'fas fa-exclamation-triangle' : icon,
      caption: !caption
        ? ' '
        : `<div style="font-size:14px;font-weight:500;">${caption}</div>`,
      textColor: 'warning',
      color: 'warning-color-100',
      classes: 'warning',
      timeout: !time ? 3000 : time,
      html: true,
    });
  }

  return {
    info,
    warn,
    error,
    success,
  };
}
