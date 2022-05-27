#include <stdio.h>
#include <stdlib.h>
#include <time.h>
#include <string.h>
#include <iostream>
using namespace std;
int main(void) {
	time_t s, val = 1;
	struct tm* current_time;
	s = time(NULL);
	current_time = localtime(&s);
	unsigned short day = current_time->tm_mday;
	unsigned short month = current_time->tm_mon+1;
	string sday = to_string (day);
	string smonth = to_string (month);
	string suma = smonth + sday;
	srand(stoi(suma));
	printf("%d", rand() % 134);
	return 0;
}
