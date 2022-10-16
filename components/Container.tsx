import { ReactNode } from "react";
import clsx from "clsx";

type ContainerProps = {
    children?: ReactNode | undefined;
    className?: string | undefined;
}

const Container = (props: ContainerProps) => {
    return (
        <div className={clsx("lg:px-10", props.className)} {...props}>
            <div className="lg:max-w-6xl">
                <div className="mx-auto px-4 sm:px-6 md:max-w-6xl md:px-4 lg:px-10">
                    {props.children}
                </div>
            </div>
        </div>
    );
};

export default Container;
