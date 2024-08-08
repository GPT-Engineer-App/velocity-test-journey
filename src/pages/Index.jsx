import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Search, Paw, Heart } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const CatBreed = ({ name, description, index }) => {
  const { toast } = useToast();

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className="mb-4 hover:shadow-lg transition-all duration-300 transform hover:scale-105">
        <CardHeader>
          <CardTitle className="text-2xl font-bold flex items-center">
            <Paw className="mr-2 h-6 w-6 text-purple-600" />
            {name}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-lg">{description}</CardDescription>
          <Button 
            variant="outline" 
            className="mt-4"
            onClick={() => toast({
              title: "Liked!",
              description: `You've added ${name} to your favorites!`,
            })}
          >
            <Heart className="mr-2 h-4 w-4" />
            Like
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [catFact, setCatFact] = useState("");
  const catBreeds = [
    { name: "Siamese", description: "Known for their distinctive color points and blue eyes." },
    { name: "Maine Coon", description: "One of the largest domesticated cat breeds with a distinctive physical appearance." },
    { name: "Persian", description: "Characterized by their round face and short muzzle." },
    { name: "Bengal", description: "Known for their wild appearance and energetic personality." },
    { name: "Sphynx", description: "Distinctive for their lack of coat and wrinkled skin." },
  ];

  const filteredBreeds = catBreeds.filter(breed =>
    breed.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const catImages = [
    "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/1200px-Cat03.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Cat_November_2010-1a.jpg/1200px-Cat_November_2010-1a.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Kittyply_edit1.jpg/1200px-Kittyply_edit1.jpg",
  ];

  useEffect(() => {
    fetch('https://catfact.ninja/fact')
      .then(response => response.json())
      .then(data => setCatFact(data.fact));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-pink-100 p-8">
      <div className="max-w-4xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-5xl font-bold mb-6 text-center text-purple-800"
        >
          Feline Fascination
        </motion.h1>

        <Carousel className="mb-8">
          <CarouselContent>
            {catImages.map((src, index) => (
              <CarouselItem key={index}>
                <motion.img
                  src={src}
                  alt={`Cat ${index + 1}`}
                  className="mx-auto object-cover w-full h-[400px] rounded-lg"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="bg-white p-6 rounded-lg shadow-md mb-8"
        >
          <h2 className="text-2xl font-semibold mb-2 text-purple-800">Did You Know?</h2>
          <p className="text-lg text-gray-700">{catFact}</p>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-xl text-gray-700 mb-8"
        >
          Cats are fascinating creatures that have been domesticated for thousands of years. They are known for their
          independence, agility, and affectionate nature. Cats come in various breeds, each with its unique
          characteristics and personalities.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mb-8"
        >
          <h2 className="text-3xl font-semibold mb-4 text-purple-800">Explore Cat Breeds</h2>
          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="Search cat breeds..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-grow"
            />
            <Button variant="outline">
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
          </div>
        </motion.div>

        <AnimatePresence>
          {filteredBreeds.map((breed, index) => (
            <CatBreed key={breed.name} name={breed.name} description={breed.description} index={index} />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Index;
