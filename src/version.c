#include "version.h"

#include <ctype.h>

/* Reads up to three dot-separated numbers out of a tag name. */
static void parse(const char *s, int out[3])
{
    out[0] = out[1] = out[2] = 0;
    if (!s)
        return;
    while (*s == 'v' || *s == 'V' || isspace((unsigned char)*s))
        s++;
    for (int i = 0; i < 3 && isdigit((unsigned char)*s); i++) {
        int n = 0;
        while (isdigit((unsigned char)*s))
            n = n * 10 + (*s++ - '0');
        out[i] = n;
        if (*s != '.')
            break;
        s++;
    }
}

int version_compare(const char *a, const char *b)
{
    int va[3], vb[3];
    parse(a, va);
    parse(b, vb);
    for (int i = 0; i < 3; i++) {
        if (va[i] != vb[i])
            return va[i] < vb[i] ? -1 : 1;
    }
    return 0;
}
