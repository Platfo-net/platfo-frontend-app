import { Notify } from 'quasar';

export function useNotify() {
  function success(
    msg?: string,
    caption?: string,
    time?: number,
    icon?: string
  ) {
    return Notify.create({
      message: !msg
        ? ' '
        : `<div style="font-size:17px;font-weight:500;">${msg}</div>`,
      icon: !icon ? 'check_circle' : icon,
      caption: !caption
        ? ' '
        : `<div style="font-size:14px;font-weight:500;">${caption}</div>`,
      textColor: 'positive',
      color: 'success-color-100',
      classes: 'success',
      timeout: !time ? 3000 : time,
      html: true,
    });
  }

  function error(msg?: string, caption?: string, time?: number, icon?: string) {
    return Notify.create({
      message: !msg
        ? ' '
        : `<div style="font-size:17px;font-weight:500;">${msg}</div>`,
      icon: !icon ? 'error' : icon,
      caption: !caption
        ? ' '
        : `<div style="font-size:14px;font-weight:500;">${caption}</div>`,
      textColor: 'negative',
      color: 'danger-color-100',
      classes: 'danger',
      timeout: !time ? 3000 : time,
      html: true,
    });
  }

  function info(msg?: string, caption?: string, time?: number, icon?: string) {
    return Notify.create({
      message: !msg
        ? ' '
        : `<div style="font-size:17px;font-weight:500;">${msg}</div>`,
      icon: !icon ? 'fas fa-IR-info-circle' : icon,
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
      icon: !icon ? 'fas fa-IR-exclamation-triangle' : icon,
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
