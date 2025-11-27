// components/ui/CharacterCard.js
import Link from 'next/link';
import Image from 'next/image';
import { Badge } from './badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './card';

export default function CharacterCard({ character }) {
  const statusVariant = {
    Alive: 'default',
    Dead: 'destructive',
    unknown: 'secondary',
  };

  return (
    <Link href={`/characters/${character.id}`}>
      <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group">
        <div className="relative h-64 w-full overflow-hidden">
          <Image
            src={character.image}
            alt={character.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <CardHeader>
          <CardTitle className="line-clamp-1">{character.name}</CardTitle>
          <CardDescription className="flex items-center gap-2">
            <Badge variant={statusVariant[character.status]}>
              {character.status}
            </Badge>
            <span>{character.species}</span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold">Last location:</span>
            <br />
            {character.location.name}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}