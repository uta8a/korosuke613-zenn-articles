import { useEffect } from 'react';

type IMyIconProps = {
  iconPath: string;
  iconClass: string;
};

const cssClassNames = [
  'rotate-animation-x',
  'rotate-animation-y',
  'rotate-animation-z',
  'rotate-animation-xy',
  'rotate-animation-xz',
  'rotate-animation-yz',
];

export const MyIcon = (props: IMyIconProps) => {
  useEffect(() => {
    const icons = document.getElementsByClassName(props.iconClass);

    Array.from(icons).forEach((icon) => {
      // クリック時にランダムにアニメーションのクラスを付与する
      icon.addEventListener('click', () => {
        const randNum = Math.floor(Math.random() * cssClassNames.length);
        const pickedCssClassName =
          cssClassNames[randNum] || 'rotate-animation-z';
        icon.classList.add(pickedCssClassName);
      });

      // アニメーションが終わったらアニメーションのクラスを削除する
      const removeClass = () => {
        cssClassNames.forEach((cssClassName) => {
          // どのクラスが付与されているかわからないので全部削除する
          icon.classList.remove(cssClassName);
        });
      };
      icon.addEventListener('animationend', removeClass);
      icon.addEventListener('animationcancel', removeClass);
    });
  });

  return (
    <img
      src={props.iconPath}
      style={{ width: '100%' }}
      alt="Avatar image"
      loading="lazy"
    />
  );
};
