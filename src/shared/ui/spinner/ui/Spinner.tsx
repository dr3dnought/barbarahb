import { LoaderCircleIcon } from 'lucide-react';
import { forwardRef, memo } from 'react';
import { cn } from '~/lib/utils';

type SpinnerProps = React.ComponentPropsWithoutRef<typeof LoaderCircleIcon>;

const Spinner = memo(
    forwardRef<SVGSVGElement, SpinnerProps>(({ className, size, ...props }, ref) => {
        return (
            <LoaderCircleIcon
                ref={ref}
                className={cn('animate-spin duration-700', className)}
                data-spinner
                {...props}
            />
        );
    }),
);
Spinner.displayName = 'Spinner';

export default Spinner;
