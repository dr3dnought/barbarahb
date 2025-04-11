import { Slot, Slottable } from '@radix-ui/react-slot';
import { type VariantProps, cva } from 'class-variance-authority';

import { cn } from '~/lib/utils';
import { Spinner } from '../../spinner';

const buttonVariants = cva(
    [
        'relative inline-flex shrink-0 cursor-pointer items-center justify-center gap-2',
        'whitespace-nowrap rounded-md font-medium text-sm transition-all',
        'outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50',

        'data-[disabled=true]:cursor-not-allowed data-[disabled=true]:select-none',
        'data-[disabled=false]:data-[loading=true]:cursor-wait data-[disabled=false]:data-[loading=true]:select-none',
        'data-[disabled=false]:data-[loading=true]:text-transparent',

        '[&_svg:not([class*="size-"])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0',
    ],
    {
        variants: {
            variant: {
                default: 'bg-primary text-primary-foreground shadow-xs hover:bg-primary/90',
            },
            size: {
                default: 'h-9 px-4 py-2 has-[>svg]:px-3',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
        },
    },
);

type ButtonProps = React.ComponentProps<'button'> &
    VariantProps<typeof buttonVariants> & {
        loading?: boolean;
        asChild?: boolean;
    };

const Button: React.FC<ButtonProps> = ({
    className,
    variant,
    size,
    disabled = false,
    loading = false,
    asChild = false,
    ...props
}) => {
    const Comp = asChild ? Slot : 'button';

    return (
        <Comp
            data-slot={'button'}
            className={cn(buttonVariants({ variant, size, className }))}
            disabled={disabled || loading}
            data-disabled={disabled}
            data-loading={loading}
            {...props}
        >
            <Slottable>{props.children}</Slottable>
            {loading && !disabled && <Spinner className={'absolute size-5 stroke-primary-foreground '} />}
        </Comp>
    );
};
Button.displayName = 'Button';

export default Button;
