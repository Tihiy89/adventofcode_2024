#include <fstream>
#include <iostream>
#include <stdlib.h>
#include <string>
#include <vector>

using namespace std;

// const char* INPUT_FILE = "input/mini_a";
const char* INPUT_FILE = "input/a";

typedef vector< long > Input;

typedef long Output;

Input ReadInput()
{
   Input input;
   ifstream fin( INPUT_FILE );

   long a;

   while( !fin.eof() )
   {
      fin >> a;
      input.push_back( a );
   }
   return std::move( input );
}

struct Node
{
   uint64_t val = NULL;
   Node* next = nullptr;

   Node( uint64_t _v )
   {
      val = _v;
   }
};

struct Queue
{
   Node* first = nullptr;
   Queue( std::vector< long > input )
   {
      Node* curr = first;
      for( auto el : input )
      {
         if( first == nullptr )
         {
            first = new Node( el );
            curr = first;
         }
         else
         {
            curr->next = new Node( el );
            curr = curr->next;
         }
      }
   }

   uint64_t blink()
   {
      uint64_t i = 0;
      Node* cur = first;
      while( cur != nullptr )
      {

         if( cur->val == 0 )
         {
            cur->val = 1;
            cur = cur->next;
         }
         else if( to_string( cur->val ).size() % 2 == 0 )
         {
            std::string num = to_string( cur->val );
            cur->val = std::stol( num.substr( 0, num.size() / 2 ) );
            Node* newNode = new Node( std::stol( num.substr( num.size() / 2 ) ) );
            newNode->next = cur->next;
            cur->next = newNode;
            cur = newNode->next;
            i++;
         }
         else
         {
            cur->val = cur->val * 2024;
            cur = cur->next;
         }

         i++;
      }

      return i;
   }
};

Output Resolve_A( Input& input )
{
   Queue q = Queue( input );
   uint64_t sum = 0;
   for( size_t step = 0; step < 75; step++ )
   {
      sum = q.blink();
      cout << "Step " << step << " sum " << sum << endl;
   }

   return sum;
};

int main()
{
   Input input = ReadInput();
   cout << "A " << Resolve_A( input ) << endl;
   // cout << "A " << Resolve_B( input ) << endl;

   return 0;
}
