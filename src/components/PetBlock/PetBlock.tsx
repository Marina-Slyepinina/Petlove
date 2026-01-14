import css from './PetBlock.module.css';

interface PetImages {
    mobile: string;
    mobile2x: string;
    tablet: string;
    tablet2x: string;
    desktop: string;
    desktop2x: string;
}

interface PetBlockProps {
    images: PetImages;
    petInfo?: {
        name: string;
        birthday: string;
        description: string;
        petIcon: string;
    };
    className?: string;
}

const PetBlock = ({ images, petInfo, className }: PetBlockProps) => {
    return (
        <div className={`${css.container} ${className}`}>
            <picture className={css.picture}>
                <source
                    media="(min-width: 1280px)"
                    srcSet={`${images.desktop} 1x, ${images.desktop2x} 2x`}
                />
                <source
                    media="(min-width: 768px)"
                    srcSet={`${images.tablet} 1x, ${images.tablet2x} 2x`}
                />
                <img
                    src={images.mobile}
                    srcSet={`${images.mobile2x} 2x`}
                    alt="Dog"
                    loading="lazy"
                />
            </picture>

            <div className={css.infoCard}>
                <div className={css.petIcon}>
                    <img src={petInfo?.petIcon} alt="Pet Icon" />
                </div>
                <div className={css.textBlock}>
                    <div className={css.header}>
                        <h3 className={css.name}>{petInfo?.name}</h3>
                        <p className={css.birthday}>Birthday: <span>{petInfo?.birthday}</span></p>
                    </div>
                    <p className={css.description}>
                        {petInfo?.description}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PetBlock;