#include <fstream>
#include <iostream>
#include <vector>

using namespace std;

typedef struct
{
   vector< int > a;
   vector< int > b;
} Input;

typedef int Output;

Input ReadInput()
{
   Input input;
   ifstream fin( "input/mini_a" );

   int a, b;

   while( !fin.eof() )
   {
      fin >> a >> b;
      input.a.push_back( a );
      input.b.push_back( b );
   }
   return std::move( input );
}

Output Resolve_A( Input& input )
{
   return 0;
};

Output Resolve_B( Input& input )
{
   return 0;
};

int main()
{
   Input input = ReadInput();
   cout << "A " << Resolve_A( input ) << endl;
   cout << "A " << Resolve_B( input ) << endl;

   return 0;
}
