// app/characters/[id]/page.js
import { getCharacterById } from '../../../services/characterService';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import { Card, CardContent } from '../../../components/ui/card';
import { ArrowLeft } from 'lucide-react';

export default async function CharacterDetail({ params }) {
  const resolvedParams = await params;
  let character = null;
  let error = null;

  try {
    character = await getCharacterById(resolvedParams.id);
  } catch (err) {
    error = err.message;
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <h1 className="text-3xl font-bold text-destructive mb-4">Error</h1>
        <p className="text-muted-foreground mb-4">{error}</p>
        <Button asChild variant="outline">
          <Link href="/">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
        </Button>
      </div>
    );
  }

  const statusVariant = {
    Alive: 'default',
    Dead: 'destructive',
    unknown: 'secondary',
  };

  return (
    <div>
      <Button asChild variant="ghost" className="mb-6">
        <Link href="/">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Characters
        </Link>
      </Button>

      <Card className="overflow-hidden">
        <div className="md:flex">
          {/* Image Section */}
          <div className="md:w-1/3 relative h-96 md:h-auto">
            <Image
              src={character.image}
              alt={character.name}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Info Section */}
          <CardContent className="md:w-2/3 p-8">
            <h1 className="text-4xl font-bold mb-4">{character.name}</h1>

            <div className="space-y-4">
              <div>
                <Badge variant={statusVariant[character.status]} className="text-sm">
                  {character.status}
                </Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InfoCard label="Species" value={character.species} />
                <InfoCard label="Gender" value={character.gender} />
                <InfoCard label="Origin" value={character.origin.name} />
                <InfoCard label="Last Location" value={character.location.name} />
              </div>

              <Card className="bg-muted">
                <CardContent className="pt-6">
                  <h3 className="text-lg font-semibold mb-2">Episodes Appeared</h3>
                  <p className="text-muted-foreground">{character.episode.length} episodes</p>
                </CardContent>
              </Card>

              <div className="pt-4 border-t">
                <p className="text-sm text-muted-foreground">
                  Created: {new Date(character.created).toLocaleDateString()}
                </p>
              </div>
            </div>
          </CardContent>
        </div>
      </Card>
    </div>
  );
}

function InfoCard({ label, value }) {
  return (
    <Card>
      <CardContent className="pt-6">
        <p className="text-sm text-muted-foreground mb-1">{label}</p>
        <p className="text-lg font-semibold">{value}</p>
      </CardContent>
    </Card>
  );
}