import { ArrowRight, Book } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

interface RelatedResourcesProps {
  nextLesson: { title: string; href: string } | null;
  docs: { title: string; href: string }[];
}

export default function RelatedResources({ nextLesson, docs }: RelatedResourcesProps) {
  return (
    <div>
      <h2 className="font-headline text-2xl font-bold mt-12 mb-6">What's Next?</h2>
      <div className="grid md:grid-cols-2 gap-4">
        {nextLesson && (
          <Link href={nextLesson.href} className="block group">
            <Card className="h-full hover:border-primary transition-colors">
              <CardHeader>
                <CardTitle className="text-sm text-muted-foreground">Up Next</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-semibold flex items-center">
                  {nextLesson.title}
                  <ArrowRight className="h-5 w-5 ml-2 transform group-hover:translate-x-1 transition-transform" />
                </p>
              </CardContent>
            </Card>
          </Link>
        )}
        
        <Card>
          <CardHeader>
            <CardTitle className="text-sm text-muted-foreground">Related Resources</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {docs.map((doc, index) => (
                <li key={index}>
                  <a
                    href={doc.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-primary hover:underline"
                  >
                    <Book className="h-4 w-4 mr-2" />
                    <span>{doc.title}</span>
                  </a>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
