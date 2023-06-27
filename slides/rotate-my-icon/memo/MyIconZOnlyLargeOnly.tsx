import { useEffect } from 'react';

type IMyIconProps = {
  iconPath: string;
  iconId: string;
};

const cssClassName = 'rotate-animation-z';

export const MyIcon = (props: IMyIconProps) => {
  useEffect(() => {
    const thisImg = document.getElementById(props.iconId);
    if (thisImg === null) return;

    // クリック時にアニメーションのクラスを付与する
    thisImg.addEventListener('click', () => {
      thisImg.classList.add(cssClassName);
    });

    // アニメーションが終わったらアニメーションのクラスを削除する
    const removeClass = () => {
      thisImg.classList.remove(cssClassName);
    };
    thisImg.addEventListener('animationend', removeClass);
    thisImg.addEventListener('animationcancel', removeClass);
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
