import { EmptyState } from '@/components/ui/empty-state';
import { ButtonLink } from '@/components/ui/button';

export default function ProductNotFound() {
  return (
    <div className="container-page py-20">
      <EmptyState
        title="We couldn't find that product"
        description="It may have been discontinued or the link may be out of date."
        action={<ButtonLink href="/products">Browse all products</ButtonLink>}
      />
    </div>
  );
}
